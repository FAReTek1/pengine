%include backpack/pengine/pengine.gs

costumes "blank.svg", "circle.svg";
hide;

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
    switch_costume "circle";
    erase_all;
    RESET_POS;
    set_ps_color_HSVA cHSVA{h: 0, s: 0, v: 0, a: 100 - 50 * mouse_down()};
    fill_outline 10, 8;
    set_ps_color_HSVA cHSVA{h: 75, s: 100, v: 100, a: 100 - 50 * mouse_down()};
    cstamp;
}
