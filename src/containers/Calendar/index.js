import React from 'react';
import dayjs from "dayjs";
import Button from "../../components/Button";
import Stickie from "../../components/Stickie";
import Loader from '../../components/Loader';
import "./style.css";

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      isLoading: true,
      error: null
    };
    this.showUsers = this.showUsers.bind(this);
  }

  componentDidMount() {
    const { monthNames } = this.state;
    const url = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const bDayCalendar = [];
          monthNames.map(month => bDayCalendar.push({ month, users: [] }))
          data.map(user => {
            const monthN = new Date(user.dob).getMonth();
            bDayCalendar[monthN].users.push(user);
          })
    
          this.setState({
            bDayCalendar
          })
        })
    } catch (error) {
      this.setState({
        error,
      })
    }

    setTimeout(() => this.setState({ isLoading: false }), 1100);
  }

  guessColor = (count) => {
    switch(true) {
      case count >= 3 && count <= 6:
        return 'Blue';
      case count >= 7 && count <= 10:
        return 'Green';
      case count >= 11:
        return 'Red';
      default:
        return 'Gray';
    }
  }

  showUsers(e) {
    const monthNumber = e.target.getAttribute('monthnumber');
    this.setState({
      activeMonth: this.state.bDayCalendar[monthNumber]
    })
  }

  render() {
    const { showUsers, guessColor } = this;
    const { activeMonth, bDayCalendar, error, isLoading } = this.state;
    
    return (
      <div>
        {error && <div>{error}</div>}
        {isLoading ? (
          <Loader />
        ) : (
          <section className="Calendar">
            <header>
              {
                bDayCalendar && bDayCalendar.map((date, i) => (
                    <Button
                      text={date.month}
                      onMouseOut={showUsers}
                      onMouseOver={showUsers}
                      className={guessColor(date.users.length)}
                      key={i}
                      monthnumber={i}
                    >{date.month}
                    </Button>
                ))
              }
            </header>
          {
            activeMonth && (
              <Stickie>
                <h3>{activeMonth.month}</h3>
                {
                  activeMonth.users.map(user =>
                    <p key={user.id}>
                      {user.firstName} {user.lastName},{" "}
                      <strong>{dayjs(user.dob).format("DD-MM-YYYY")}</strong>
                    </p>
                  )
                }
              </Stickie>
            )
          }
          </section>
        )}
      </div>
    )
  }
}

export default Calendar;
