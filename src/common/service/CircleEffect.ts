interface ICircleEffect {
  isShowing: boolean;
  toggle: (isOpen: boolean) => void;
}

const circleEffect: ICircleEffect = {
  isShowing: false,
  toggle: (isOpen: boolean) => {},
};

export const getCircleEffect = () => circleEffect;
