import {
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";


const BackArrow = ({ formatting }: {formatting: string | null}) => {
     const navigate = useNavigate();

    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Go to the previous page</Tooltip>}
            >
              <Button
                variant="link"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                title="Go back" 
                className={`p-0 ${formatting}`}
              >
                <IoMdArrowRoundBack size={25} />
              </Button>
            </OverlayTrigger>
    );
    
}

export default BackArrow;