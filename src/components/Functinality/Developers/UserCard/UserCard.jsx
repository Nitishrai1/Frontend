import { Mail, ExternalLink } from 'lucide-react';
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const UserCard = ({ user }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [developerId, setDeveloperId] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  useState(() => {
    setClientEmail(user.userEmail);
    setDeveloperId(user.userId);
  }, [user]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message || !file) {
      alert("Please fill out the message and upload the file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await fetch(`${apiUrl}/user/Search/upload-projectFile`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      const projectUrl = uploadData.projectUrl;

      const notificationData = {
        developerId,
        message,
        clientEmail,
        projectUrl,
      };

      const saveResponse = await fetch(`${apiUrl}/user/Search/save-projectDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      handleCloseModal();
      alert("Project details uploaded and notification saved successfully!");
    } catch (error) {
      console.error("Error uploading project details:", error);
      alert("Error uploading project details.");
    }
  };

  const messageDev = () => setIsMessageOpen(true);
  const handleCloseModal = () => setIsMessageOpen(false);

  return (
    <div className="overflow-hidden transition-all hover:shadow-lg bg-white p-6 flex flex-col items-center text-center rounded-lg border border-green-200">
      <div className="w-24 h-24 mb-4 bg-green-200 rounded-full flex justify-center items-center overflow-hidden">
        {user.imageLink ? (
          <img
            src={user.imageLink}
            alt={`${user.userName}'s profile`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-xl text-green-700">
            {(user.userName || "NA")
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-1 text-green-700">{user.userName}</h3>
      <p className="text-sm text-green-600 mb-4">{user.userEmail}</p>

      <div className="flex space-x-4">
        <button
          onClick={messageDev}
          aria-label="Message Developer"
          className="focus:outline-none text-green-600 hover:text-green-700 transition-colors"
        >
          <Mail size={20} />
        </button>

        {isMessageOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></div>

            <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 max-w-full z-10">
              <h2 className="text-lg font-semibold mb-4 text-green-700">
                Message Developer
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-green-700">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={handleMessageChange}
                    className="w-full border border-green-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">
                    Upload Project Document
                  </label>
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    onChange={handleFileChange}
                    className="w-full border border-green-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <a
          href={user.imageLink || "#"}
          className="text-green-600 hover:text-green-700 transition-colors"
          aria-label={`View ${user.userName}'s profile`}
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
};

export default UserCard;