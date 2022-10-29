import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import { displayMusicFestival } from '../slices/music';
import { MusicSuccessResponse } from '../util/music-api';
import MusicFestivalRecords from "../types/music-festival-records";


const Music = () => {
  const dispatch: any = useDispatch();
  const { musicFestival } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    dispatch(displayMusicFestival());
  }, [dispatch]);

  const musicFestivalsOutput = returnMusicFestivalResult(musicFestival);

  return (
    <div>
      <ul>
        {musicFestivalsOutput.map((recordsData, recordsDataIndex) => (
          <li key={recordsDataIndex}>
            {recordsData.recordLabel}
            {recordsData.bands.map((bandsData, bandsDataIndex) => (
              <ul>
                <li key={bandsDataIndex}>
                  {bandsData.name}
                  <>
                    <ul>
                      {bandsData.festival.map((festivalData, index) => {
                        return (
                          <li key={index}>
                            {festivalData}
                            <br />
                          </li>
                        );
                      })}
                    </ul>
                  </>
                </li>
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Method to get the musical festival in descired format

const returnMusicFestivalResult = (musicFestival: MusicSuccessResponse) => {
  const output: Array<MusicFestivalRecords> = [];
  musicFestival.forEach((festival) => {
    festival.bands.forEach((bandVal) => {
      const labelFound = output.findIndex((records) => records.recordLabel === bandVal.recordLabel);
      if (labelFound != -1) {
        const bandFound = output[labelFound].bands.findIndex((band) => band.name === bandVal.name);
        if (bandFound != -1) {
          output[labelFound].bands[bandFound].festival.push(festival.name);
        } else {
          output[labelFound].bands.push({
            name: bandVal.name,
            festival: [festival.name],
          });
        }
      } else {
        output.push({
          recordLabel: bandVal.recordLabel,
          bands: [
            {
              name: bandVal.name,
              festival: [festival.name],
            },
          ],
        });
      }
    });
  });

  return output;
};

export default Music;
