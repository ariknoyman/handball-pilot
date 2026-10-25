// Local stand-in for the hosting platform's router helpers.
// HashRouter in the offline package so every page also works from file:// (double-click).
export { HashRouter as FileRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
