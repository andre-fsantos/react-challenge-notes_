import { Note } from "./Note"
import './Layout.css';

const Layout = () => {
    return (
        <main>
            <aside>
                <div className="box-input-title">
                    <input type="text" placeholder="Title" className="inputTitle" />
                </div>
                <div className="box-textarea">
                    <textarea placeholder="Content"></textarea>
                </div>
                <div>
                    <button>Add Note</button>
                </div>
            </aside>
            <div className="notes">
                <Note />
                <Note />
                <Note />
            </div>
        </main>
    )
}

export { Layout }