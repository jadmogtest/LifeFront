//*** userId test à modifier en "" ensuite ***

export default function userId(userId = "6284ac1a174ad5a364179d77", action) {
    if (action.type === "addUserId") {
        userId = action.userId
        return userId;
    } else {
        return userId;
    }
}
