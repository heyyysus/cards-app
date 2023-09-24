import { FC } from 'react';
import { PlanMapSelect } from '../PlanMapSelect';
import { MapSearchList } from '../MapSearchList';



const Step2: FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <PlanMapSelect 
                initCenter={{ lat: 0, lng: 0 }} 
                initZoom={ 9 } 
                selectCoord={ (coord) => { console.log(coord) } }
            />
        </div>
    );
}

export default Step2;