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
    set_ps_color_HSVA cHSVA{h: 90, s: 75, v: 75, a: 100 - 50 * mouse_down()};
    fill_capped_line Line{x1: x_position(), y1: y_position(), x2: mouse_x(), y2: mouse_y()}, 20, 
                     50 * mouse_down();
}
