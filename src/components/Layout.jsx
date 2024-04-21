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
                <div className="note">
                    <div className='box-btn-close'>
                        <img src='/btnClose.svg' />
                    </div>
                    <h2>Note 1</h2>
                    <div className='box-content'>
                        <p>This is the content for note 1</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export { Layout }