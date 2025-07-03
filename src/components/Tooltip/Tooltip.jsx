import React from 'react';
import styles from './Tooltip.module.css';

class Tooltip extends React.Component {
    state = {
        isTooltipVisible: false,
    };

    showTooltip = () => {
        this.setState({ isTooltipVisible: true });
    };

    hideTooltip = () => {
        this.setState({ isTooltipVisible: false });
    };

    render() {
        const { triggerText, tooltipContent } = this.props;
        const { isTooltipVisible } = this.state;

        return (
            <span
                className={styles.tooltip}
                onMouseEnter={this.showTooltip}
                onMouseLeave={this.hideTooltip}
            >
                <span className={styles.tooltipTrigger}>{triggerText}</span>
                {isTooltipVisible && (
                    <span className={styles.tooltipBox}>
                        <a href={`tel:${tooltipContent.replace("Call us: ", "")}`} className={styles.tooltipLink}>
                            {tooltipContent}
                        </a>
                    </span>
                )}
            </span>
        );
    }
}

export default Tooltip;