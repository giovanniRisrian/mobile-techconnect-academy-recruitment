import {useState} from 'react';
import {useNavigate} from 'react-router';
import {DETAIL_STATUS} from '../../../../navigation/NavigationPath';
import {
  goToScreen,
  goToScreenWithParams,
} from '../../../../navigation/NavigationHelper';

const ListProgramApply = statusService => {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  //let navigate = useNavigate();
  let {getAppliedProgram} = statusService();
  const getListAppliedProgram = async (params, redux) => {
    console.log('INI REDUX DI getListApplied Program');
    console.log(redux);
    try {
      const config = {
        headers: {Authorization: `Bearer ${redux.token}`},
      };
      setLoading(true);
      let response = await getAppliedProgram(params, config);
      console.log('INI RESPONSE');
      console.log(response);
      setList(response.data);
      setLoading(false);
      return list;
    } catch (err) {
      throw err;
    }
  };
  const goToDetailStatus = params => {
    goToScreenWithParams(DETAIL_STATUS, params, false);
  };
  return {
    list,
    loading,
    //navigate,
    getListAppliedProgram,
    goToDetailStatus,
  };
};

export default ListProgramApply;
