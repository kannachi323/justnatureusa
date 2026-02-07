import { useState, useEffect } from "react";
import { TiHeart } from "react-icons/ti";
import { IoArrowBack, IoAdd, IoTrash, IoClose } from "react-icons/io5";

import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";
import { fetchUserLikes, type LikedImage } from "../utils/likes";
import {
  fetchUserLists,
  fetchListItems,
  createList,
  removeFromList,
  deleteList,
  type UserList,
  type ListItem,
} from "../utils/lists";
import { getAuth } from "firebase/auth";

export default function Collections() {
  const { user } = useAuth();
  const [likes, setLikes] = useState<LikedImage[]>();
  const [lists, setLists] = useState<UserList[]>();
  const [activeList, setActiveList] = useState<UserList | null>(null);
  const [listItems, setListItems] = useState<ListItem[]>();
  const [newListName, setNewListName] = useState("");
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [creatingList, setCreatingList] = useState(false);
  console.log("User: ", user?.id);
  const auth = getAuth();
  if (auth.currentUser?.uid !== user?.id) {
      console.log("bad user");
  } else {
      console.log(auth.currentUser?.uid);
      console.log(user?.id);
  }
  useEffect(() => {
    if (!user) return;
    fetchUserLikes(user.id).then(setLikes);
    fetchUserLists(user.id).then(setLists);
  }, [user]);

  useEffect(() => {
    if (!user || !activeList) return;
    setListItems(undefined);
    fetchListItems(user.id, activeList.id).then(setListItems);
  }, [user, activeList]);

  async function handleCreateList() {
    const name = newListName.trim();
    if (!name || !user) return;
    setCreatingList(true);
    await createList(user.id, name);
    setNewListName("");
    setShowNewListInput(false);
    setCreatingList(false);
    const updated = await fetchUserLists(user.id);
    setLists(updated);
  }

  async function handleRemoveFromList(galleryDocId: string) {
    if (!user || !activeList) return;
    setListItems((prev) => prev?.filter((i) => i.galleryDocId !== galleryDocId));
    await removeFromList(user.id, activeList.id, galleryDocId);
    const updatedLists = await fetchUserLists(user.id);
    setLists(updatedLists);
    const current = updatedLists.find((l) => l.id === activeList.id);
    if (current) setActiveList(current);
  }

  async function handleDeleteList() {
    if (!user || !activeList) return;
    await deleteList(user.id, activeList.id);
    setActiveList(null);
    setListItems(undefined);
    const updated = await fetchUserLists(user.id);
    setLists(updated);
  }

  // List detail view
  if (activeList) {
    return (
      <div className="w-full min-h-[90vh] bg-[#f8f8f3] p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => { setActiveList(null); setListItems(undefined); }}
              className="text-[#4a3f35] hover:text-[#ccab8f] cursor-pointer"
            >
              <IoArrowBack size={24} />
            </button>
            <h1 className="text-3xl font-bold text-[#4a3f35] flex-1">{activeList.name}</h1>
            <button
              onClick={handleDeleteList}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-500 cursor-pointer"
            >
              <IoTrash size={16} />
              Delete list
            </button>
          </div>

          {!listItems ? (
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : listItems.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {listItems.map((item) => (
                <div key={item.galleryDocId} className="relative group overflow-hidden">
                  <img
                    src={item.src}
                    alt="saved"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFromList(item.galleryDocId)}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-[#a09488]">
              <p className="text-lg">This list is empty.</p>
              <p className="text-sm mt-1">Save images from the gallery to add them here.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] bg-[#f8f8f3] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4a3f35] mb-8">Collections</h1>

        {/* Likes section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TiHeart className="text-2xl text-red-400" />
            <h2 className="text-xl font-semibold text-[#4a3f35]">Likes</h2>
          </div>

          {!likes ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : likes.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {likes.map((img) => (
                <div key={img.galleryDocId} className="overflow-hidden">
                  <img
                    src={img.src}
                    alt="liked"
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#a09488]">No liked images yet. Heart images in the gallery!</p>
          )}
        </div>

        {/* Lists section */}
        <div>
          <h2 className="text-xl font-semibold text-[#4a3f35] mb-4">Lists</h2>

          {!lists ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {lists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => setActiveList(list)}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer"
                >
                  <div className="w-full h-36 bg-[#e8ddd4]">
                    {list.coverUrl && (
                      <img src={list.coverUrl} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-[#4a3f35] truncate">{list.name}</p>
                    <p className="text-xs text-[#8c7a66]">
                      {list.imageCount} {list.imageCount === 1 ? "image" : "images"}
                    </p>
                  </div>
                </button>
              ))}

              {/* Create new list card */}
              {showNewListInput ? (
                <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 flex flex-col justify-center">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateList()}
                    placeholder="List name"
                    autoFocus
                    className="text-sm border-b border-[#ccab8f] outline-none py-1 text-[#4a3f35] placeholder-[#b5a393] mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateList}
                      disabled={creatingList || !newListName.trim()}
                      className="text-xs bg-[#ccab8f] text-white px-3 py-1.5 rounded-md hover:bg-[#b5977e] disabled:opacity-50 cursor-pointer"
                    >
                      {creatingList ? "..." : "Create"}
                    </button>
                    <button
                      onClick={() => { setShowNewListInput(false); setNewListName(""); }}
                      className="text-xs text-[#8c7a66] hover:text-[#4a3f35] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewListInput(true)}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center h-[200px] cursor-pointer border-2 border-dashed border-[#ccab8f]/40 hover:border-[#ccab8f]"
                >
                  <IoAdd className="text-3xl text-[#ccab8f] mb-2" />
                  <p className="text-sm font-medium text-[#8c7a66]">Create New List</p>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
