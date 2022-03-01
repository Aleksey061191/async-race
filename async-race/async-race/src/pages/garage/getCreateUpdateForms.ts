export function getForms(): string {
  return `
        <form class="form" id="create">
            <input class="input" id="create-name" name="name" type="text">
            <input class="color" id="create-color" name="color" type="color" value="#ffffff">
            <button class="button" id="create-btn" type="submit" disabled>Create</button>
        </form>
        <form class="form" id="update">
            <input class="input" id="update-name" name="name" type="text" disabled>
            <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled>
            <button class="button" id="update-btn" type="submit" disabled>Update</button>
        </form>
    `;
}