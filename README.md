<h1>Print Format (CD)</h1>
<p>This is a tool for displaying data as pages to be able to be printed using browser as rendering machine.</p>
<p>Printed document would be in A4 portrait mode.</p>
<p>This print format specifically generates pages for customer receipt of a department that shall not be named.</p>
<p>The page being generated has a table of variable number of items. But header (except for page number), footer would be the same. It would get all table rows inside a slots tag of ReceiptFormat and split them into multiple pages if necessary.</p>
<p>Finally it would put page number into generated pages.</p>
<p>Now this is very similar to my other repository called "Print Format M". The difference is that this one doesn't rely on localStorage and instead will fetch data from server.</p>
