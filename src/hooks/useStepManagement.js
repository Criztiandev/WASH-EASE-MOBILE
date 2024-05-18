import { useSetAtom } from "jotai";
import { stepAtom } from "../service/states/service.atoms";
import { useEffect } from "react";

const useStepManagement = ({ name }) => {
  const setCurrentStep = useSetAtom(stepAtom);

  useEffect(() => {
    setCurrentStep(name);
    return () => setCurrentStep("");
  }, [name, setCurrentStep]);
};

export default useStepManagement;
