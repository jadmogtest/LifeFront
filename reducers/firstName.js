export default function firstName(firstName = "", action) {
    if (action.type === "addfirstName") {
        let newFirstName = action.firstName;
        console.log("Salut", newFirstName)
        return newFirstName;

    } else {
        return firstName;
    }

}