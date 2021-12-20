import React from "react";
import { Transition } from "react-transition-group";
import UserStatisticAnim from "../../atoms/UserStatisticAnim";

const animDuration = 500;

/* Transition timeout values */
const timeout = {
    appear: 0,
    enter: animDuration,
    exit: 50
};

/**
 * Component responsible for displaying player's level and handling animation of leveling up.
 */
class UserLevel extends React.Component {
    state = {
        level: 0,
        percentage: 0,
        newLevelAnimation: false
    }

    setStateFromProps = (props) => {
        this.setState({
            level: props.level,
            percentage: props.percentage
        });
    }

    componentDidMount() {
        this.setStateFromProps(this.props);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.level > prevProps.level) {
            this.handleNewLevel();
        }
        else if (this.props.level !== prevProps.level || this.props.percentage !== prevProps.percentage) {
            this.setStateFromProps(this.props);
        }
    }

    /**
     * Start new level animation by filling exp bar and setting boolean. 
     */
    startNewLevelAnim = () => {
        this.setState({
            percentage: 100,
            newLevelAnimation: true
        })
    }

    /**
     * Handles new level animation.
     */
    handleNewLevel = () => {
        this.startNewLevelAnim();

        setTimeout(() => {
            this.setState({
                level: this.props.level,
            });
        }, animDuration / 2);

        setTimeout(
            () => {
                this.setState({
                    newLevelAnimation: false,
                    percentage: 0
                });
            },
            animDuration * 1.5
        );

        setTimeout(() => {
            this.setState({
                percentage: this.props.percentage
            })
        }, animDuration * 2);
    }

    render() {
        return (
            <Transition in={this.state.newLevelAnimation} timeout={timeout}>
                {transitionState => (
                    <UserStatisticAnim 
                        statisticNumber={this.state.level}
                        type={'level'}
                        currentLvlValue={this.state.percentage}
                        setMargin={this.props.setMargin}
                        transitionState={transitionState}
                        animDuration={animDuration}
                    />
                )}
            </Transition>
            
        )
    }
}

export default UserLevel;