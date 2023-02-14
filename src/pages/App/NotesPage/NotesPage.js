export default function NotesPage({notes}) {

    return (
    <form>
    <h2>Notes Page</h2>
    <input id="add-note" type="text" name="addNote" placeHolder="Note Entry"/>
    <button id="add-note">Add Note</button>
    </form>
    )
}