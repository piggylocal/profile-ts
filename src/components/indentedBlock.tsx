import {ReactNode} from "react";

const IndentedBlock = ({children}: { children: ReactNode }) => {
    return (
        <div className="indent">
            {children}
        </div>
    )
};

export default IndentedBlock;
