import React from 'react';
import Label from './styled-components/Label';
import Icon from './styled-components/Icon';
import Number from './styled-components/Number';
import termIcon from '../../../../../assets/images/termIcon.png';
import levelIcon from '../../../../../assets/icons/levelIcon.svg';
import rankIcon from '../../../../../assets/images/rankIcon.png';

class UserLabel extends React.Component {

    /*
    props:
        term -> term data
        level -> level data
        rank -> rank data
        setMargin -> set margin property
     */

    handleIcon(term, level, rank) {
        if (term)
            return termIcon;
        else if (level)
            return levelIcon;
        else if (rank)
            return rankIcon;
    }

    render() {
        return (
            <Label term={this.props.term}
                   level={this.props.level}
                   rank={this.props.rank}
                   setMargin={this.props.setMargin}>
                <Icon src={this.handleIcon(this.props.term, this.props.level, this.props.rank)}/>
                <Number>
                    {this.props.number}
                </Number>
            </Label>
        );
    }
}

export default UserLabel;