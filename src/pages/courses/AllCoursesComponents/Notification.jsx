const Notification = ({ notification, setNotification }) => (
  notification.message && (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white z-50 ${
      notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      <div className="flex items-center justify-between">
        <span>{notification.message}</span>
        <button onClick={() => setNotification({ message: '', type: '' })} className="ml-4">
          ✕
        </button>
      </div>
    </div>
  )
);

export default Notification;