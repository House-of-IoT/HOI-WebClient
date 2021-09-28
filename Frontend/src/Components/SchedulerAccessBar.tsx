import React, { Component } from 'react'
import schedule_img from "../Img/white-scheduler.png"

export default class SchedulerAccessBar extends Component {
    render() {
        return (
            <div id = "scheduler-access">
                <h3>Scheduling</h3>
                <button>Schedule Task</button>
                <button>View Tasks</button>
            </div>
        )
    }
}
