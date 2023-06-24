import { useAtom, atom } from "jotai";
import { squatAtom, deadliftAtom, benchAtom, rmModalIsOpenAtom, rpeModalIsOpenAtom, deloadModalIsOpenAtom } from "~/store/store";

const OneRMCard = () => {
  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);
  return (
    <div>
      <h1>One RM Card</h1>
    </div>
  );
};

export default OneRMCard;
