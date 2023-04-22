import React from "react";
import Obfuscate from "./obfuscate.jsx";

class NotificationBuilder {
    removeNotification(element) {
    setTimeout(function() {
    element.style.opacity = 1
    }, 10)
    setTimeout(function() {
    element.style.opacity = 0
    setTimeout(function() {
    element.remove()
    }, 300)
    }, 5000)
    }
    constructor() {
    this.notifications = []
    }
    create(config = {text: ""}) {
    var notifications = document.getElementById("notifications")
    
    var notification = document.createElement("div")
    notification.className = "notification"
    
    var notificationText = document.createElement("div")
    notificationText.className = "notification-text"
    notificationText.innerText = <Obfuscate>config.text</Obfuscate>
    
    notification.appendChild(notificationText)
    
    notifications.appendChild(notification)
    
    notifications.style.transition = "bottom 0.3s cubic-bezier(0.6, 0.4, 0, 1)"
    notifications.setAttribute("new", "")
    
    setTimeout(function() {
    notifications.style.transition = "none"
    notifications.appendChild(notification)
    notifications.removeAttribute("new")
    notification.style.marginBottom = 0
    }, 300)
    
    this.removeNotification(notification)
    
    this.notifications.push(notification)
    }
}
    
var Notifications = new NotificationBuilder()

function NotificationsMain() {  
    return (
        <div id="notifications"></div>
    )
}

export { NotificationsMain, Notifications };