//*** userId test à modifier en "" ensuite ***

export default function userId(userId = "6286be262422c34349257f3b", action) { //userId rentré en dur => à changer
    if (action.type === "addUserId") {
        userId = action.userId
        return userId;
    } else {
        return userId;
    }
}
