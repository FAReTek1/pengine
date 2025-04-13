%include backpack/pengine/pengine.gs

costumes "blank.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

func node_from_pos(pos p) Node {
    return Node{x: $p.x, y: $p.y};
}

proc setup{
    hide;
}

proc tick{
    set_ps_color_HEX "FF00FF";

    erase_all;
    RESET_POS;
    draw_arc my_pos(), mouse_x() * 2, 0.5, 10;
}
