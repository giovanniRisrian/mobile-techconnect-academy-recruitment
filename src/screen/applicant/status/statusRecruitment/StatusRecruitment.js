import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const StatusRecruitment = (statusService) => {
  //let params = useParams();
  //let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [statusProgram, setStatusProgram] = useState({});
  //const [statusProgramMin1,setStatusProgramMin1] = useState({});
  let {getDetailAppliedProgram} = statusService();

  const getStatusbyId = async (idProgram, idApplicant, redux) => {
   
    try {
      const config = {
        headers: { Authorization: `Bearer ${redux.token}` },
      };
      setLoading(true)
      const response = await getDetailAppliedProgram(idProgram, idApplicant, config);
      setStatusProgram(response.data);
      /*console.log("INI HASIL YANG PENGEN DI KURANG 1");
      console.log(response.data.ApplyProcess.SelectionProcessId);
      setStatusProgramMin1(response.data.ApplyProcess.SelectionProcessId-1)*/
      setLoading(false)
      return statusProgram;
    } catch (err) {
      throw err;
    }
  };

  return {
    statusProgram,
    //statusProgramMin1,
    //params,
    loading,
    //navigate,
    getStatusbyId,
  };
};

export default StatusRecruitment;
