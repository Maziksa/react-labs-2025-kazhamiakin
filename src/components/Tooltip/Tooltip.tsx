import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
    triggerText: string;
    tooltipContent: string;
}

const Tooltip: React.FC<TooltipProps> = ({ triggerText, tooltipContent }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

    return (
        <span
            className={styles.tooltip}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
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

export default Tooltip;
