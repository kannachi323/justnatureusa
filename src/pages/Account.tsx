import { useAuth } from "../hooks/useAuth";
import { FiUser, FiMail } from "react-icons/fi";

export default function Account() {
  const { user } = useAuth();

  if (!user) return null;

  const displayName = user.username.split("@")[0];
  const email = user.username;

  return (
    <div className="w-full min-h-[90vh] bg-[#f8f8f3] flex items-center justify-center p-8">
      <div className="bg-[#fefbfa] rounded-2xl shadow-lg w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-[#4a3f35] mb-6 text-center">Account</h1>

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-[#eaddd2] w-20 h-20 flex justify-center items-center">
            <img src="/favicon.ico" alt="profile" className="w-14 h-14 object-cover" />
          </div>
        </div>

        {/* Info fields */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-[#f8f4f1] rounded-lg p-4">
            <FiUser className="text-xl text-[#ccab8f] shrink-0" />
            <div>
              <p className="text-xs text-[#a09488] uppercase tracking-wide">Display Name</p>
              <p className="text-[#4a3f35] font-medium">{displayName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#f8f4f1] rounded-lg p-4">
            <FiMail className="text-xl text-[#ccab8f] shrink-0" />
            <div>
              <p className="text-xs text-[#a09488] uppercase tracking-wide">Email</p>
              <p className="text-[#4a3f35] font-medium">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#f8f4f1] rounded-lg p-4">
            <div className="w-5 h-5 rounded-full bg-green-400 shrink-0" />
            <div>
              <p className="text-xs text-[#a09488] uppercase tracking-wide">Status</p>
              <p className="text-[#4a3f35] font-medium">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
