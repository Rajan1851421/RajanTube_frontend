import React from 'react'

function Search() {
    const searchList = [
        { name: 'Education' },
        { name: 'Entertainment' },
        { name: 'Music' },
        { name: 'Sports' },
        { name: 'Technology' },
        { name: 'Others' }
    ]

    return (

        <div className='w-full flex justify-between items-center'>
            <ul className="mt-2 flex justify-between  items-center gap-3 mx-2">
                {searchList.map((item, index) => (
                    <li key={index} className="p-1 border rounded-md text-xs">
                        {item.name}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Search
