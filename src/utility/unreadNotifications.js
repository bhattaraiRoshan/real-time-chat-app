export const unReadNotificationsFun = (notifications) =>{
    return notifications.filter((noti) => noti.isRead === false)
}