import { useState, useEffect } from 'react';
import { IoClose, IoCheckmark, IoAdd } from 'react-icons/io5';
import {
  fetchUserLists,
  createList,
  saveToList,
  removeFromList,
  getListMembershipForImage,
  type UserList,
} from '../utils/lists';

type Props = {
  uid: string;
  galleryDocId: string;
  storagePath: string;
  onClose: () => void;
};

export default function ListPickerPopup({ uid, galleryDocId, storagePath, onClose }: Props) {
  const [lists, setLists] = useState<UserList[]>([]);
  const [membership, setMembership] = useState<Set<string>>(new Set());
  const [newListName, setNewListName] = useState('');
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const userLists = await fetchUserLists(uid);
      setLists(userLists);
      if (userLists.length > 0) {
        const mem = await getListMembershipForImage(
          uid,
          galleryDocId,
          userLists.map((l) => l.id)
        );
        setMembership(mem);
      }
      setLoading(false);
    }
    load();
  }, [uid, galleryDocId]);

  async function handleToggleList(listId: string) {
    const isMember = membership.has(listId);
    const next = new Set(membership);
    if (isMember) {
      next.delete(listId);
      setMembership(next);
      await removeFromList(uid, listId, galleryDocId);
    } else {
      next.add(listId);
      setMembership(next);
      await saveToList(uid, listId, galleryDocId, storagePath);
    }
    // Refresh list counts
    const updated = await fetchUserLists(uid);
    setLists(updated);
  }

  async function handleCreateList() {
    const name = newListName.trim();
    if (!name) return;
    setCreating(true);
    const newId = await createList(uid, name);
    setNewListName('');
    setCreating(false);
    // Refresh
    const updated = await fetchUserLists(uid);
    setLists(updated);
    // Auto-save the image to the new list
    const next = new Set(membership);
    next.add(newId);
    setMembership(next);
    await saveToList(uid, newId, galleryDocId, storagePath);
    const refreshed = await fetchUserLists(uid);
    setLists(refreshed);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-[#f8f8f3] rounded-xl shadow-xl w-80 max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8ddd4]">
          <h3 className="text-lg font-semibold text-[#4a3f35]">Save to list</h3>
          <button onClick={onClose} className="text-[#8c7a66] hover:text-[#4a3f35] cursor-pointer">
            <IoClose size={22} />
          </button>
        </div>

        {/* List items */}
        <div className="overflow-y-auto flex-1 py-2">
          {loading ? (
            <p className="text-center text-sm text-[#8c7a66] py-6">Loading...</p>
          ) : (
            <>
              {lists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleToggleList(list.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#eaddd2] transition-colors text-left cursor-pointer"
                >
                  {/* Cover thumbnail */}
                  <div className="w-10 h-10 rounded bg-[#e8ddd4] overflow-hidden flex-shrink-0">
                    {list.coverUrl && (
                      <img src={list.coverUrl} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#4a3f35] truncate">{list.name}</p>
                    <p className="text-xs text-[#8c7a66]">
                      {list.imageCount} {list.imageCount === 1 ? 'image' : 'images'}
                    </p>
                  </div>
                  {membership.has(list.id) && (
                    <IoCheckmark className="text-[#ccab8f] text-xl flex-shrink-0" />
                  )}
                </button>
              ))}

              {lists.length === 0 && (
                <p className="text-center text-sm text-[#8c7a66] py-4">
                  No lists yet. Create one below!
                </p>
              )}
            </>
          )}
        </div>

        {/* Create new list */}
        <div className="border-t border-[#e8ddd4] px-4 py-3">
          <div className="flex items-center gap-2">
            <IoAdd className="text-[#ccab8f] text-xl flex-shrink-0" />
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
              placeholder="Create new list"
              className="flex-1 text-sm bg-transparent border-b border-[#ccab8f] outline-none py-1 text-[#4a3f35] placeholder-[#b5a393]"
            />
            {newListName.trim() && (
              <button
                onClick={handleCreateList}
                disabled={creating}
                className="text-xs bg-[#ccab8f] text-white px-3 py-1 rounded-md hover:bg-[#b5977e] disabled:opacity-50 cursor-pointer"
              >
                {creating ? '...' : 'Add'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
