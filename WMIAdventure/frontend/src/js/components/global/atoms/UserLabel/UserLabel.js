import React from 'react';
import Label from './styled-components/Label';
import Icon from './styled-components/Icon';
import Number from './styled-components/Number';
import termIcon from '../../../../../assets/images/termIcon.png';
import levelIcon from '../../../../../assets/icons/levelIcon.svg';
import rankIcon from '../../../../../assets/images/rankIcon.png';
import skillPointsIcon from '../../../../../assets/icons/skillPoints.svg';

class UserLabel extends React.Component {

    /*
    props:
        term -> term data
        level -> level data
        rank -> rank data
        setMargin -> set margin property
     */

    handleIcon(term, level, rank, skillPoints) {
        if (term)
            return termIcon;
        else if (level)
            return levelIcon;
        else if (rank)
            return rankIcon;
        else if (skillPoints)
            return skillPointsIcon;
    }

    render() {
        return (
            <Label term={this.props.term}
                   level={this.props.level}
                   rank={this.props.rank}
                   skillPoints={this.props.skillPoints}
                   setMargin={this.props.setMargin}>
                <Icon src={this.handleIcon(this.props.term, this.props.level, this.props.rank, this.props.skillPoints)}/>
                <Number>
                    {this.props.number}
                </Number>
            </Label>
        );
    }
}

export default UserLabel;