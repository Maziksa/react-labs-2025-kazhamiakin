import './UserList.css'

function UserList() {
    const items = [
        'React Core',
        'React Hooks',
        'React Router',
        'Context API',
        'Redux',
        'React.memo'
    ]

    return (
        <div className="list-container">
            <h1>Strange React list</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;