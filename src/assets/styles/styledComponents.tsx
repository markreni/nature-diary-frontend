import Button from 'react-bootstrap/Button';

interface VariantsExampleProps {
  text: string;
}

function GreenButton({ text }: VariantsExampleProps) {
  return (
    <>
      <style type="text/css">
        {`
  .btn-flat {
      background-color: #90ee90;
      color: #155724;
      border: none;
      border-radius: 150px;
      box-shadow: 0 2px 8px rgba(144, 238, 144, 0.2);
      font-weight: 700;
      letter-spacing: 0.5px;
      transition: background 0.2s, box-shadow 0.2s;
    }

    .btn-flat:hover, .btn-flat:focus {
      background-color: #7ed957;
      color: #0b3d1c;
      box-shadow: 0 4px 16px rgba(144, 238, 144, 0.3);
    }
    `}
      </style>

      <Button variant="flat" size="lg">
        {text}
      </Button>
    </>
  );
}

export default GreenButton;