%include backpack/pengine/pengine



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

    delete cnc_ngon;
    add Node{x: 0, y: 0} to cnc_ngon;
    add node_mouse() to cnc_ngon;
    add Node{x: 100, y: 100} to cnc_ngon;
    add Node{x: 100, y: 0} to cnc_ngon;

    set_pen_color "#0000FF";
    FILL_LIST(cnc_ngon);
    Circle c = circle_from_pos(my_pos());

    set_pen_color "#FF0000";
    circle_ngon_clip c;
    render_cnc;

    draw_circle c, 30;

    DRAW_LIST(cnc_ngon);
}
