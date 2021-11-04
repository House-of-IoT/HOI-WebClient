import React, { Component } from 'react'
import schedule_img from "../Img/white-scheduler.png"

export default class SchedulerAccessBar extends Component<any,any> {
    render() {
        return (
            <div id = "scheduler-access">
                <h3>Scheduling</h3>
                <div id = "scheduler-button-wrapper">
                    <button className = "scheduler-access-buttons" id = "schedule-task-button"
                    onClick = {()=>{this.props.set({scheduler_popup_showing:true})}}
                    >Schedule Task</button>
                    <button className = "scheduler-access-buttons">View Tasks</button>
                </div>
   
            </div>
        )
    }
}
