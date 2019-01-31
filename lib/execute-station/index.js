import Listr from 'listr';

/**
 * Returns Listr conform input to run a listr-instance
 */
export const stationToListr = (
  station = n => n,
  props = {},
  title = 'Executing...'
) => {
  const stationConstructor = station.constructor;
  const listrTasks = [];

  switch (stationConstructor) {
    case Array: {
      const accumlatedStations = station.map((stationInstance, index) =>
        stationToListr(
          stationInstance,
          props,
          `Job ${index + 1}/${station.length}`
        )
      );

      listrTasks.push(...[].concat(...accumlatedStations));
      break;
    }

    case Object: {
      listrTasks.push({
        ...station,
        task: (_context, task) => station.task(props, task)
      });
      break;
    }

    default: {
      listrTasks.push({
        title,
        task: (_context, task) => station(props, task)
      });
      break;
    }
  }

  return listrTasks;
};

/*
 das hier in ne eigene funkion packen die n'"listr" kompatibles ding zurück gibt, das ExecuteStation teil benutzt dann listr
 */
const ExecuteStation = async (station = n => n, props = []) => {
  try {
    await new Listr(stationToListr(station, ...props)).run();
  } catch (err) {
    throw err;
  }
};

export default ExecuteStation;

/*


      // new Listr([
      //   {
      //     title: 'Execute',
      //     task: (_, task) => selectedStation.exec(assign(...answers), task)
      //   }
      // ]).run();

- if exec (func) is a function just 
- detects array in exec and runs them either concurrent or not 
- Uses Listr to execute them, provides / proxies the API so the user has the listr task options as second prop
- 

*/
