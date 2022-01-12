import React from "react";
import Ul from "./styled-components/Ul";
import Li from "./styled-components/Li";
import Heading from "./styled-components/Heading";
import P from "./styled-components/P";
import Before from "./styled-components/Before";


class RatelimitInfo extends React.Component {
    getRemaining(data) {
        return Math.max(0, data.limit - data.counter);
    }

    getFightsPerUserRemaining() {
        return this.props.data ? this.getRemaining(this.props.data.global) : '-';
    }

    getFightsWithOpponentRemaining() {
        return this.props.data ? this.getRemaining(this.props.data.perUser) : '-';
    }

    getTextForReset(data) {
        if (!data)
            return ' ';

        return (data.counter > 0) ? `Reset za ${this.convertSecondsToPrettyTime(data.time_left)}` : ' ';
    }

    getTextForOpponentTimerReset() {
        return this.props.data ? this.getTextForReset(this.props.data.perUser) : ' ';
    }

    getTextForGlobalTimerReset() {
        return this.props.data ? this.getTextForReset(this.props.data.global) : ' ';
    }

    convertSecondsToPrettyTime = (seconds) => {
        if (!seconds) return null;

        let result = new Date(seconds * 1000).toISOString().slice(12, 19);
        const tokens = result.split(':');
        return `${tokens[0]} h ${tokens[1]} min`;
    };

    render() {
        return (
            <Ul>
                <Li>
                    <Before access={this.getFightsPerUserRemaining() > 0}>{this.getFightsPerUserRemaining()}</Before>
                    <Heading>Dostępne pojedynki</Heading>
                    <P>{this.getTextForGlobalTimerReset()}</P>
                </Li>
                {this.getFightsWithOpponentRemaining() === 2 ? null :
                    <Li>
                        <Before
                            access={this.getFightsWithOpponentRemaining() > 0}>{this.getFightsWithOpponentRemaining()}</Before>
                        <Heading>Rewanż {this.getFightsWithOpponentRemaining() > 0 ? '' : 'nie'}dostępny</Heading>
                        <P>{this.getTextForOpponentTimerReset()}</P>
                    </Li>
                }
            </Ul>
        )
    }
}

export default RatelimitInfo;