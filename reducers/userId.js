//*** userId test à modifier en "" ensuite ***

export default function userId(userId = "628699a6c8b12883fa34951f", action) { //userId rentré en dur => à changer
    if (action.type === "addUserId") {
        userId = action.userId
        return userId;
    } else {
        return userId;
    }
}
