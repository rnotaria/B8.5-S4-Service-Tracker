import React from "react";
import "./index.css";
// import { auth } from "./Firebase/firebase";
import { MaintenanceTrackerContextProvider } from "./Contexts/MaintenanceTrackerContext";
import { DataContextProvider } from "./Contexts/DataContext";
import MaintenanceTracker from "./Components/MaintenanceTracker";
import { db } from "./Firebase/firebase";

export default function App() {
  // auth.createUserWithEmailAndPassword("email123@g.com", "password123");
  // auth.signOut().then(() => {
  //   console.log("user signed out");
  // });

  // auth
  //   .signInWithEmailAndPassword("email123@g.com", "password123")
  //   .then((cred) => {
  //     console.log(cred.user);
  //   });

  // // Retreiving data
  // db.collection("AudiServiceSchedule")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });

  // Saving data
  db.collection("AudiServiceSchedule").add({
    data: {
      "5000": {
        miles: 5000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "15000": {
        miles: 15000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task3: {
            id: "task3",
            title:
              "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary",
            info: {
              subtitle: "",
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task4: {
            id: "task4",
            title: "Dust and pollen filter - Replace filter",
            info: {
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2", "task3", "task4"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "25000": {
        miles: 25000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "35000": {
        miles: 35000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task3: {
            id: "task3",
            title:
              "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary",
            info: {
              subtitle: "",
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task4: {
            id: "task4",
            title: "Dust and pollen filter - Replace filter",
            info: {
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task5: {
            id: "task5",
            title:
              "DSG - Change ATF oil and replace transmission filter element for clutch hydraulics",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/kj69XxnZ8B4" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2", "task3", "task4", "task5"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "45000": {
        miles: 45000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "55000": {
        miles: 55000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task3: {
            id: "task3",
            title:
              "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary",
            info: {
              subtitle: "",
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task4: {
            id: "task4",
            title: "Dust and pollen filter - Replace filter",
            info: {
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task5: {
            id: "task5",
            title:
              "Ribbed V-belt - Replace only the belt for the compressor drive (Supercharger Belt)",
            info: {
              instructions:
                '<p><strong>DIY: </strong><a href="https://www.audiworld.com/forums/a6-c7-platform-discussion-194/diy-supercharger-belt-front-v-belt-replacement-2886198/" rel="noopener noreferrer" target="_blank" style="color: rgb(204, 224, 245);">https://www.audiworld.com/forums/a6-c7-platform-discussion-194/diy-supercharger-belt-front-v-belt-replacement-2886198/</a></p><p><br></p><p><strong>Part:</strong><strong style="color: rgb(204, 224, 245);"> </strong><a href="https://www.fcpeuro.com/products/audi-vw-accessory-drive-belt-supercharger-vag-06e903137ab" rel="noopener noreferrer" target="_blank" style="color: rgb(204, 224, 245);">https://www.fcpeuro.com/products/audi-vw-accessory-drive-belt-supercharger-vag-06e903137ab</a></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task6: {
            id: "task6",
            title: "Spark plugs - Replace",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/wmZI42A-JPA" height="315" width="560"></iframe><p><br></p><p><br></p><h2 class="ql-align-center">Where to buy</h2><p class="ql-align-center"><a href="https://www.rockauto.com/en/catalog/audi,2016,s4,3.0l+v6+supercharged,3353730,ignition,spark+plug,7212" rel="noopener noreferrer" target="_blank" style="color: rgb(204, 224, 245);">https://www.rockauto.com/en/catalog/audi,2016,s4,3.0l+v6+supercharged,3353730,ignition,spark+plug,7212</a></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2", "task3", "task4", "task5", "task6"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "65000": {
        miles: 65000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "75000": {
        miles: 75000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task3: {
            id: "task3",
            title:
              "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary",
            info: {
              subtitle: "",
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task4: {
            id: "task4",
            title: "Dust and pollen filter - Replace filter",
            info: {
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task5: {
            id: "task5",
            title:
              "DSG - Change ATF oil and replace transmission filter element for clutch hydraulics",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/kj69XxnZ8B4" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2", "task3", "task4", "task5"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "85000": {
        miles: 85000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "95000": {
        miles: 95000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task3: {
            id: "task3",
            title:
              "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary",
            info: {
              subtitle: "",
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task4: {
            id: "task4",
            title: "Dust and pollen filter - Replace filter",
            info: {
              instructions: "",
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2", "task3", "task4"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
      "105000": {
        miles: 105000,
        tasks: {
          task1: {
            id: "task1",
            title:
              "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
            info: {
              instructions: "",
              notes: "Replace every two years, regardless of miles.",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
          task2: {
            id: "task2",
            title: "Engine oil / Oil filter - Change oil and replace filter",
            info: {
              instructions:
                '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
              notes: "",
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          column1: {
            id: "column1",
            title: "To Do",
            taskIds: ["task1", "task2"],
          },
          column2: {
            id: "column2",
            title: "Complete",
            taskIds: [],
          },
        },
        columnOrder: ["column1", "column2"],
      },
    },
    container: {
      user: "guest",
      isNew: true,
      vehicle: {
        year: "2016",
        make: "Audi",
        model: "S4",
      },
      miles: "57000",
    },
  });

  return (
    <div>
      <MaintenanceTrackerContextProvider>
        <DataContextProvider>
          <MaintenanceTracker />
        </DataContextProvider>
      </MaintenanceTrackerContextProvider>
    </div>
  );
}
