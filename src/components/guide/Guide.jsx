import {
  CategorySection,
  CategoryTitle,
  SizeGuideContainer,
  SizeGuideTitle,
  SizeNote,
  SizeTable,
  TableHeader,
  TableRow,
} from "./StyledComponentsGuia";

export const Guide = () => {
  return (
    <SizeGuideContainer>
      <SizeGuideTitle>
        <i className="bi bi-rulers"></i>
        Guía de Tallas
      </SizeGuideTitle>

      <SizeTable>
        <TableHeader>
          <div>
            <i className="bi bi-tag"></i>
            Talla
          </div>
          <div>
            <i className="bi bi-arrows-expand"></i>
            Largo (cm)
          </div>
          <div>
            <i className="bi bi-globe-europe"></i>
            Talla EUR
          </div>
        </TableHeader>

        <CategorySection>
          <CategoryTitle>
            <i className="bi bi-emoji-smile"></i>
            Niños (3-8 años)
          </CategoryTitle>

          <TableRow>
            <div>21</div>
            <div>13.0</div>
            <div>22</div>
          </TableRow>

          <TableRow>
            <div>22</div>
            <div>13.7</div>
            <div>23</div>
          </TableRow>

          <TableRow>
            <div>23</div>
            <div>14.3</div>
            <div>24</div>
          </TableRow>

          <TableRow>
            <div>24</div>
            <div>15.0</div>
            <div>25</div>
          </TableRow>

          <TableRow>
            <div>25</div>
            <div>15.6</div>
            <div>26</div>
          </TableRow>

          <TableRow>
            <div>26</div>
            <div>16.3</div>
            <div>27</div>
          </TableRow>
        </CategorySection>

        <CategorySection>
          <CategoryTitle>
            <i className="bi bi-people"></i>
            Jóvenes (9-16 años)
          </CategoryTitle>

          <TableRow>
            <div>27</div>
            <div>17.0</div>
            <div>28</div>
          </TableRow>

          <TableRow>
            <div>28</div>
            <div>17.6</div>
            <div>29</div>
          </TableRow>

          <TableRow>
            <div>29</div>
            <div>18.3</div>
            <div>30</div>
          </TableRow>

          <TableRow>
            <div>30</div>
            <div>19.0</div>
            <div>31</div>
          </TableRow>

          <TableRow>
            <div>31</div>
            <div>19.6</div>
            <div>32</div>
          </TableRow>

          <TableRow>
            <div>32</div>
            <div>20.3</div>
            <div>33</div>
          </TableRow>

          <TableRow>
            <div>33</div>
            <div>21.0</div>
            <div>34</div>
          </TableRow>

          <TableRow>
            <div>34</div>
            <div>21.6</div>
            <div>35</div>
          </TableRow>
        </CategorySection>

        <CategorySection>
          <CategoryTitle>
            <i className="bi bi-person-check"></i>
            Adultos (17+ años)
          </CategoryTitle>

          <TableRow>
            <div>35</div>
            <div>22.5</div>
            <div>36</div>
          </TableRow>

          <TableRow>
            <div>36</div>
            <div>23.0</div>
            <div>37</div>
          </TableRow>

          <TableRow>
            <div>37</div>
            <div>23.5</div>
            <div>38</div>
          </TableRow>

          <TableRow>
            <div>38</div>
            <div>24.0</div>
            <div>39</div>
          </TableRow>

          <TableRow>
            <div>39</div>
            <div>24.5</div>
            <div>40</div>
          </TableRow>

          <TableRow>
            <div>40</div>
            <div>25.0</div>
            <div>41</div>
          </TableRow>

          <TableRow>
            <div>41</div>
            <div>25.5</div>
            <div>42</div>
          </TableRow>

          <TableRow>
            <div>42</div>
            <div>26.0</div>
            <div>43</div>
          </TableRow>

          <TableRow>
            <div>43</div>
            <div>26.5</div>
            <div>44</div>
          </TableRow>

          <TableRow>
            <div>44</div>
            <div>27.0</div>
            <div>45</div>
          </TableRow>

          <TableRow>
            <div>45</div>
            <div>27.5</div>
            <div>46</div>
          </TableRow>
        </CategorySection>
      </SizeTable>

      <SizeNote>
        <p>
          <i className="bi bi-info-circle"></i>
          <strong>Recomendación:</strong> Mide el pie al final del día para
          obtener la medida más precisa. Para niños, considera dejar 0.5-1cm de
          espacio adicional para el crecimiento.
        </p>
      </SizeNote>
    </SizeGuideContainer>
  );
};
