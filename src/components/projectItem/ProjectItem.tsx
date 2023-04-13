import ProjectImage from "./ProkectImage";
import Title from "./Title";
import { Hash } from "react-feather";
import styles from "./styles.module.css";
import { MutableRefObject, useReducer, useRef, useState } from "react";

interface IProps {
  project: Project;
  itemIndex: number;
  menuItem: MutableRefObject<HTMLUListElement | null>;
}

enum ActionKind {
  GLOBAL = "GLOBAL",
  COORDINATES = "COORDINATES",
}

interface Action {
  type: ActionKind;
  payload: {
    opacity: number;
    parralaxPos: { x: number; y: number };
    scale: number;
    textPosX: number;
  };
}

interface State {
  opacity: number;
  parralaxPos: { x: number; y: number };
  scale: number;
  textPosX: number;
}

const initialState = {
  opacity: 0,
  parralaxPos: { x: 0, y: 0 },
  scale: 0.8,
  textPosX: -300,
};

function counterReducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.GLOBAL:
      return {
        ...state,
        opacity: payload.opacity,
        scale: payload.scale,
        textPosX: payload.textPosX,
      };
    case ActionKind.COORDINATES:
      return {
        ...state,
        parralaxPos: payload.parralaxPos,
      };

    default:
      return state;
  }
}

function ProjectItem({ project, itemIndex, menuItem }: IProps) {
  const listItem = useRef<HTMLLIElement | null>(null);
  const [state, dispatch] = useReducer(counterReducer, initialState);

  // const easeMethod = "linear";

  const parralax = (event: MouseEvent) => {
    const speed = -20;

    const x = (window.innerHeight - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;

    dispatch({
      type: ActionKind.COORDINATES,
      payload: { ...state, parralaxPos: { x: x, y: y } },
    });
  };

  // const handleOpacity = (
  //   initialOpacity: number,
  //   newOpacity: number,
  //   duration: number
  // ) => {
  //   animate({
  //     fromValue: initialOpacity,
  //     toValue: newOpacity,
  //     onUpdate: (newOpacity, callBack: void) => {
  //       dispatch({
  //         type: ActionKind.OPACITY,
  //         payload: { opacity: newOpacity, parralaxPos: { x: 0, y: 0 } },
  //       });
  //       callBack;
  //     },
  //     OnComplete: () => {},
  //     duration,
  //     easeMethod,
  //   });
  // };

  const handleMouseEnter = () => {
    // handleOpacity(0, 1, 1000);
    dispatch({
      type: ActionKind.GLOBAL,
      payload: { ...state, opacity: 1, scale: 1, textPosX: 0 },
    });

    if (listItem.current) {
      listItem.current.addEventListener("mousemove", parralax);
    }
  };

  const handleMouseLeave = () => {
    // handleOpacity(1, 0, 1000);
    dispatch({
      type: ActionKind.GLOBAL,
      payload: { ...state, opacity: 0, scale: 0.8, textPosX: -300 },
    });

    if (listItem.current) {
      listItem.current.removeEventListener("mousemove", parralax);
    }
  };

  return (
    <li ref={listItem} className={styles.projectItemContainer}>
      <Title
        title={project.title}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <ProjectImage
        url={project.url}
        title={project.title}
        opacity={state.opacity}
        parralaxPos={state.parralaxPos}
        scale={state.scale}
      />

      <div className="fixed top-1/4 hidden lg:flex left-[80vw] overflow-hidden font-poppins">
        <div
          style={{
            transform: `translateX(${state.textPosX}px)`,
          }}
          className="text-left text-lg ease-in-out duration-500"
        >
          <p className="mb-5 font-medium text-xl">
            <span className="flex items-center">
              <Hash className="mr-1" />0{itemIndex}
            </span>
          </p>

          {project.info.map((el, index) => (
            <p className="mb-3 overflow-hidden" key={index}>
              <span className="block">{el}</span>
            </p>
          ))}
        </div>
      </div>
    </li>
  );
}

export default ProjectItem;
