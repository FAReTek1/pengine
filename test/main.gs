%include backpack/pengine/pengine.gs

costumes "blank.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

proc setup{
    hide;
}

proc tick{
    erase_all;
    RESET_POS;
    STLF node_from_pos(mouse_pos()), node_from_pos(my_pos()), 50, "1", "2";
}
