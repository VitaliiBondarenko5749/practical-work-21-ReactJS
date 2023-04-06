import React from 'react';
import ReactDOM from 'react-dom/client';

class Task1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: []
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    const item = event.target.value;
    const isChecked = event.target.checked;
    this.setState(prevState => {
      if (isChecked) {
        return { checkedItems: [...prevState.checkedItems, item] };
      } else {
        return { checkedItems: prevState.checkedItems.filter(i => i !== item) };
      }
    });
  }

  render() {
    const { items } = this.props;
    const { checkedItems } = this.state;
    return (
      <div><p>Task 1</p><ul>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={item}
              checked={checkedItems.includes(item)}
              onChange={this.handleCheckboxChange} />
            <span style={{ textDecoration: checkedItems.includes(item) ? "line-through" : "none" }}>{item}</span>
          </li>
        ))}
      </ul></div>
    );
  }
}

// Task2

const employees = [
  { id: 1, firstName: 'John', lastName: 'Doe', salary: 2500 },
  { id: 2, firstName: 'Jane', lastName: 'Doe', salary: 3000 },
  { id: 3, firstName: 'Bob', lastName: 'Smith', salary: 2000 },
  { id: 4, firstName: 'Alice', lastName: 'Johnson', salary: 3500 },
];

class Task2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIds: employees.map(e => e.id),
    };
  }

  handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    this.setState(prevState => {
      if (isChecked) {
        return { checkedIds: [...prevState.checkedIds, id] };
      } else {
        return {
          checkedIds: prevState.checkedIds.filter(i => i !== id),
        };
      }
    });
  };

  render() {
    const { checkedIds } = this.state;
    const totalSalary = employees
      .filter(e => checkedIds.includes(e.id))
      .reduce((acc, curr) => acc + curr.salary, 0);

    return (
      <div>
        <p>Task 2</p>
        <table>
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Прізвище</th>
              <th>Зарплата</th>
              <th>Вибрати</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salary}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(employee.id)}
                    onChange={e => this.handleCheckboxChange(e, employee.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Загальна зарплата вибраних: {totalSalary}</p>
      </div>
    );
  }
}

// Task 3

class Task3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedState: props.items.map(() => true),
    };
  }

  handleCheckboxChange(index) {
    const { checkedState } = this.state;
    const newState = [...checkedState];
    newState[index] = !newState[index];
    this.setState({ checkedState: newState });
  }

  render() {
    const { items } = this.props;
    const { checkedState } = this.state;

    const listItems = items.map((item, index) => {
      if (checkedState[index]) {
        return (
          <div key={index}>
            <input
              type="checkbox"
              checked={checkedState[index]}
              onChange={() => this.handleCheckboxChange(index)}
            />
            <p>{item}</p>
          </div>
        );
      }
      return null;
    });

    return (
      <div>
        <p>Task 3</p>
        {listItems}
      </div>
    );
  }
}

class Task4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        { name: 'Микола', surname: 'Шевченко', age: 30, isChecked: true },
        { name: 'Василь', surname: 'Чумак', age: 40, isChecked: true },
        { name: 'Петро', surname: 'Стеценко', age: 50, isChecked: true },
      ],
      checkboxes: [true, true, true],
    };
  }

  handleCheckboxChange(index) {
    const checkboxes = [...this.state.checkboxes];
    checkboxes[index] = !checkboxes[index];

    const users = [...this.state.users];
    users[index].isChecked = checkboxes[index];

    this.setState({ checkboxes, users });
  }

  render() {
    return (
      <div>
        <p>Task 4</p>
        <ul>
          {this.state.users.map((user, index) => {
            const showDetails = this.state.checkboxes[index];

            return (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={user.isChecked}
                    onChange={() => this.handleCheckboxChange(index)} />
                  {showDetails
                    ? `${user.name} ${user.surname}, ${user.age}`
                    : user.name}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Task5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      isEditing: new Array(props.items.length).fill(false),
    };
  }

  handleItemClick = (index) => {
    const { isEditing } = this.state;
    isEditing[index] = true;
    this.setState({ isEditing });
  };

  handleInputBlur = (index, event) => {
    const { items, isEditing } = this.state;
    const newValue = event.target.value;
    items[index] = newValue;
    isEditing[index] = false;
    this.setState({ items, isEditing });
  };

  render() {
    const { items, isEditing } = this.state;
    return (
      <div><p>Task 5</p><ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => this.handleItemClick(index)}>
            {isEditing[index] ? (
              <input
                type="text"
                defaultValue={item}
                onBlur={(event) => this.handleInputBlur(index, event)} />
            ) : (
              item
            )}
          </li>
        ))}
      </ul></div>
    );
  }
}

// Task 6

class Task6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { name: 'Микола', age: 30 },
        { name: 'Василь', age: 40 },
        { name: 'Петро', age: 50 },
      ],
      activeEditIndex: null,
    };
  }

  handleEditClick = (index) => {
    this.setState({ activeEditIndex: index });
  }

  handleEditSave = (index, newValue) => {
    const updatedUsers = [...this.state.users];
    updatedUsers[index].name = newValue;
    this.setState({ users: updatedUsers, activeEditIndex: null });
  }

  handleEditSaveAge = (index, newValue) => {
    const updatedUsers = [...this.state.users];
    updatedUsers[index].age= newValue;
    this.setState({ users: updatedUsers, activeEditIndex: null });
  }

  render() {
    const { users, activeEditIndex } = this.state;
    return (
      <div><p>Task 6</p><table>
        {users.map((user, index) => (
          <tr key={index}>
            <td>
              {activeEditIndex === index ? (
                <EditInput value={user.name} onSave={(value) => this.handleEditSave(index, value)} />
              ) : (
                user.name
              )}
            </td>
            <td>
              {activeEditIndex === index ? (
                <button disabled>редагувати</button>
              ) : (
                <button onClick={() => this.handleEditClick(index)}>редагувати</button>
              )}
            </td>
            <td>
            {activeEditIndex === index ? (
                <EditInput value={user.age} onSave={(value) => this.handleEditSaveAge(index, value)} />
              ) : (
                user.age
              )}
            </td>
            <td>
              {activeEditIndex === index ? (
                <button disabled>редагувати</button>
              ) : (
                <button onClick={() => this.handleEditClick(index)}>редагувати</button>
              )}
            </td>
          </tr>
        ))}
      </table></div>
    );
  }
}

class EditInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSave = () => {
    this.props.onSave(this.state.value);
  }

  render() {
    return (
      <>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleSave}>зберегти</button>
      </>
    );
  }
}

// Task 7

class Task7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { id: 1, name: 'Маршрут 1' },
        { id: 2, name: 'Маршрут 2' },
        { id: 3, name: 'Маршрут 3' },
      ],
      selectedRoute: null,
    };
  }

  handleRouteSelection = (event) => {
    const selectedRouteId = Number(event.target.value);
    const selectedRoute = this.state.routes.find((route) => route.id === selectedRouteId);
    this.setState({ selectedRoute });
  }

  render() {
    const { routes, selectedRoute } = this.state;

    return (
      <div>
        <p>Task 7</p>
        <h2>Виберіть маршрут:</h2>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <label>
                <input
                  type="radio"
                  name="route"
                  value={route.id}
                  onChange={this.handleRouteSelection}
                  checked={selectedRoute && selectedRoute.id === route.id}
                />
                {route.name}
              </label>
            </li>
          ))}
        </ul>
        {selectedRoute && (
          <p>Ви обрали маршрут: {selectedRoute.name}</p>
        )}
      </div>
    );
  }
}

class Task8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      noteText: ''
    };
  }

  handleNoteChange = (event) => {
    this.setState({noteText: event.target.value});
  }

  handleNoteAdd = () => {
    const currentDate = new Date();
    const note = {
      title: `Нотатка ${this.state.notes.length + 1}`,
      content: this.state.noteText,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    };
    this.setState({notes: [...this.state.notes, note], noteText: ''});
  }

  handleNoteDelete = (index) => {
    const updatedNotes = [...this.state.notes];
    updatedNotes.splice(index, 1);
    this.setState({notes: updatedNotes});
  }

  handleNoteEdit = (index, newContent) => {
    const updatedNotes = [...this.state.notes];
    updatedNotes[index].content = newContent;
    this.setState({notes: updatedNotes});
  }

  render() {
    const notesList = this.state.notes.map((note, index) => {
      return (
        <div key={index}>
          <h3>{note.title} ({note.time})</h3>
          <p>{note.content}</p>
          <button onClick={() => this.handleNoteDelete(index)}>Видалити</button>
          <button onClick={() => this.handleNoteEdit(index, prompt('Введіть новий текст нотатки', note.content))}>Редагувати</button>
        </div>
      );
    });

    return (
      <div>
        <p>Task 8</p>
        <textarea value={this.state.noteText} onChange={this.handleNoteChange}></textarea>
        <br />
        <button onClick={this.handleNoteAdd}>Додати нотатку</button>
        <hr />
        {notesList}
      </div>
    );
  }
}

class Task9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [
        { id: 1, firstName: 'John', lastName: 'Doe', salary: 5000 },
        { id: 2, firstName: 'Jane', lastName: 'Doe', salary: 6000 },
        { id: 3, firstName: 'Mark', lastName: 'Smith', salary: 4000 },
        { id: 4, firstName: 'Sarah', lastName: 'Johnson', salary: 7000 },
      ],
      sortField: null,
      sortAsc: true,
    };
  }

  handleSortClick = (field) => {
    let sortAsc = true;
    if (this.state.sortField === field) {
      sortAsc = !this.state.sortAsc;
    }
    this.setState({ sortField: field, sortAsc: sortAsc });
  }

  render() {
    const sortedEmployees = this.state.employees.slice().sort((a, b) => {
      if (this.state.sortField === 'firstName') {
        if (this.state.sortAsc) {
          return a.firstName.localeCompare(b.firstName);
        } else {
          return b.firstName.localeCompare(a.firstName);
        }
      } else if (this.state.sortField === 'lastName') {
        if (this.state.sortAsc) {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return b.lastName.localeCompare(a.lastName);
        }
      } else if (this.state.sortField === 'salary') {
        if (this.state.sortAsc) {
          return a.salary - b.salary;
        } else {
          return b.salary - a.salary;
        }
      } else {
        return 0;
      }
    });

    const tableRows = sortedEmployees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.salary}</td>
      </tr>
    ));

    return (
      <div><p>Task 9</p><table>
        <thead>
          <tr>
            <th onClick={() => this.handleSortClick('firstName')}>
              First Name {this.state.sortField === 'firstName' && (this.state.sortAsc ? '▲' : '▼')}
            </th>
            <th onClick={() => this.handleSortClick('lastName')}>
              Last Name {this.state.sortField === 'lastName' && (this.state.sortAsc ? '▲' : '▼')}
            </th>
            <th onClick={() => this.handleSortClick('salary')}>
              Salary {this.state.sortField === 'salary' && (this.state.sortAsc ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table></div>
    );
  }
}

class Task10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'uk',
    };
  }

  handleLanguageChange = (event) => {
    this.setState({ language: event.target.value });
  };

  render() {
    const daysOfWeek = {
      uk: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота', 'Неділя'],
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    };
    const options = this.state.language === 'uk' ? daysOfWeek.uk : daysOfWeek.en;
    return (
      <div>
        <p>Task 10</p>
        <select value={this.state.language} onChange={this.handleLanguageChange}>
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
        <select>
          {options.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Task1 items={['Елемент 1', 'Елемент 2', 'Елемент 3']} />
    <Task2 items={employees}/>
    <Task3 items={['Hello', 'World', 'Word', 'Petro']}/>
    <Task4/>
    <Task5 items={['Елемент 1', 'Елемент 2', 'Елемент 3']} />
    <Task6/>
    <Task7/>
    <Task8/>
    <Task9/>
    <Task10/>
  </React.StrictMode>
);