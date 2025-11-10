import Alert from "react-bootstrap/Alert";

interface ErrorMsgProp {
  errorMsg: string[];
  type: string;
}

const CustomAlert: React.FC<ErrorMsgProp> = ({ errorMsg, type }) => {
  let errorType: string = "danger";
  if (type === "success") {
    errorType = "success";
  }

  return (
    <>
      <Alert key={errorType} variant={errorType}>
        {errorMsg.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </Alert>
    </>
  );
};

export default CustomAlert;
