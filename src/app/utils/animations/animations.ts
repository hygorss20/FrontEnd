import {
  transition,
  style,
  query,
  animateChild,
  animate,
  group,
  trigger,
  state,
} from "@angular/animations";

const slideToRightAnimation = [
  style({ position: "relative" }),
  query(
    ":enter, :leave",
    [
      style({
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
      }),
    ],
    { optional: true }
  ),
  query(":enter", [style({ left: "-100%" })], { optional: true }),
  query(":leave", animateChild(), { optional: true }),
  group([
    query(":leave", [animate("300ms ease-out", style({ left: "100%" }))], {
      optional: true,
    }),
    query(":enter", [animate("300ms ease-out", style({ left: "0%" }))], {
      optional: true,
    }),
  ]),
  query(":enter", animateChild(), { optional: true }),
];

const slideToLeftAnimation = [
  style({ position: "relative" }),
  query(
    ":enter, :leave",
    [
      style({
        position: "relative",
        top: 0,
        right: 0,
        width: "100%",
      }),
    ],
    { optional: true }
  ),
  query(":enter", [style({ right: "-100%" })], { optional: true }),
  query(":leave", animateChild(), { optional: true }),
  group([
    query(":leave", [animate("300ms ease-out", style({ right: "100%" }))], {
      optional: true,
    }),
    query(":enter", [animate("300ms ease-out", style({ right: "0%" }))], {
      optional: true,
    }),
  ]),
  query(":enter", animateChild(), { optional: true }),
];

export const horizontalSlideAnimation = trigger("horizontalSlideAnimation", [
  transition("* => HomePage", slideToRightAnimation),

  transition("* => *", slideToLeftAnimation),
]);
