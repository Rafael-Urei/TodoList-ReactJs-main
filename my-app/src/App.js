import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import { AiOutlinePlus} from 'react-icons/ai';
import { BiSquareRounded, BiTrash } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RxEyeNone } from 'react-icons/rx';


function DropDown() {
  return (
    <div className='dropdown'>
      <p>Edit</p>
    </div>
  )
}

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dropdown, setDropdown] = useState({
    show: false,
    key: '',
  })

  const handleAddValue = e => setValue(e.target.value);

  const preventDefault = e => e.preventDefault();

  const handleAddTask = () => {
    { value !== '' ? 
      setTasks((prevState) => {
        return [
          ...prevState,
          {
            key: uuid(),
            value: value,
            checked: false,
          }
        ]
      })
      : alert('Input cannot be blank! Type something.');
    }
    setValue('');
  };

  const handleRemove = () => {
    const newList = tasks.filter(object => object.checked ? false : true);
    setTasks(newList);
  };

  const handleChange = (key) => {
    const newList = tasks.map(object => object.key === key ? { ...object, checked: !object.checked } : object)
    setTasks(newList);
  };

  console.log(tasks);

  const handleOpenDropdown = (key) => {
    setDropdown((prevState) => {
      return {
        key: key,
        show: key === prevState.key ? !prevState.show  : true
      }
    })
  }

  return (
    <div className="App">
      <main>
        <form onSubmit={preventDefault}>
          <input type='text' name='input' value={value} placeholder='e.g. Study React.JS' onChange={handleAddValue} className='input' autoComplete='none'></input>
          <AiOutlinePlus onClick={handleAddTask} className='add-button'/>
          <ul>
            { tasks.length === 0 ?
              <>
                <RxEyeNone className='no-posts'/>
                <p>There are no posts yet!</p>
              </> :
              tasks.map((item, index) => {
                return (
                  <li
                  key={item.key}
                  className={`'' ${item.checked ? 'task' : ''}`}
                  onClick={() => {handleOpenDropdown(item.key)}}
                  >
                  <div className='container'>
                    <FiMoreHorizontal className='more-options'/>
                    {`${index} - ${item.value}`}
                    <BiSquareRounded className={`'checkbox-off' ${item.checked ? 'checkbox-on' : 'checkbox-off'}`} onClick={() => handleChange(item.key)}/>
                    {dropdown.show && dropdown.key === item.key && <DropDown/>}
                  </div>
                  </li>
                )
              })
            }
            <BiTrash onClick={handleRemove} className='remove-button'/>
          </ul>
        </form>
      </main>
    </div>
  );
}

export default App;


/*function App() {
  const [value, setValue] = useState('');
  const [task, setTask] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleAddValue = e => setValue(e.target.value);

  const preventDefault = e => e.preventDefault();

  const handleAddTask = () => {
    const newTask = value;
    value !== '' ? 
      setTask((prevState) => {
        return [
          ...prevState, 
          newTask
        ];
      }) : alert('Input cannot be blank!')
      setChecked((prevState) => {
        return [
          ...prevState,
          false
        ]
      })
  };

  const handleChange = (index) => {
    const updateCheck = checked.map((value, position, array) => {
      return position === index ? !value : value
    });

    setChecked(updateCheck);
  };

  const handleRemove = () => {
    const newArr = [];
    task.forEach((item, index) => {
      const toDelete = checked[index];
      if (!toDelete) {
        newArr.push(item);
      }
    });
    setTask(newArr)
  };

  console.log(checked);

  return (
    <div className="App">
      <form onSubmit={preventDefault}>
        <input type='text' name='input' placeholder='e.g. Study React.JS' onChange={handleAddValue}></input>
        <button onClick={handleAddTask}>Add task</button>
        { task.length !== 0 ?
          <ul>
            {task.map((value, index, array) => {
              return (
                <li key={index} className='task'>
                  { value } <input type='checkbox' checked={checked[index]} onChange={() => {handleChange(index)}}></input>
                </li>
              )
            })}
          </ul> :
          <p>Don't have posts yet</p> }
          <button onClick={handleRemove}>Remove</button>
      </form>
    </div>
  );
}

export default App;*/
