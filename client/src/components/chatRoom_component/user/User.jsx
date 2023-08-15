import "./user.css";
import { LastestMessage } from "../LastestMessage";

export default function User({
  user,
  online,
  notifications,
  unreadNotification,
  messageSend,
  arrivalMessage,
  markUserNotificationAsRead,
}) {
  const currentUserID = JSON.parse(localStorage.getItem("userID"));

  // 取得每位用戶最新的訊息
  const { lastestMessage } = LastestMessage(
    currentUserID,
    user,
    messageSend,
    arrivalMessage,
    notifications
  );

  // 避免字數過多
  const truncateText = (text) => {
    const textNum = 2;
    let shortText = text.substring(0, textNum);

    if (text.length > textNum) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  const thisUsernotification = unreadNotification?.filter(
    (n) => n.senderId === user?.userID
  );

  return (
    <div
      className="user"
      onClick={() => {
        if (thisUsernotification?.length !== 0) {
          markUserNotificationAsRead(thisUsernotification, notifications);
        }
      }}
    >
      <img
        className="userImg"
        src={
          user.profilePhoto
            ? `data:image/jpeg;base64, ${user.profilePhoto}`
            : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
        }
        alt=""
      />
      <div className={online ? "userStatus online" : "userStatus"}></div>

      <div>
        <div className="userName">{user.userName}</div>
        <span className="lastestMessage">
          {lastestMessage?.message && truncateText(lastestMessage?.message)}
        </span>
      </div>

      <span
        className={
          thisUsernotification?.length === 0 ? null : "userNotification"
        }
      ></span>
    </div>
  );
}
