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
    set_ps_color_HSVA cHSVA{h: 75, s: 100, v: 100, a: 100 - 50 * mouse_down()};

    erase_all;
    RESET_POS;
    fill_aw my_pos(), mouse_x() *2 /240;
}
