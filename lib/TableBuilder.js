function TableBuilder(id,width,height,values,maxValue) {
  this.id = id;
  this.width = width;
  this.height = height;
  this.values = values;
  this.maxValue = maxValue;
}

TableBuilder.prototype = {
  build: function() {
    this.contents = this._getContents();
  },
  
  _getContents: function() {
    var contents = "<table>";
    for (var i = 0; i < this.height; i++) {
      contents = contents + this._getRow(i);
    }
    return contents + "</table>";
  },
  
  _getRow: function(rowId) {
    var contents = "<tr>";
    for (var i = 0; i < this.width; i++) {
      contents = contents + this._getCell(rowId,i);
    }
    return contents +"</tr>";
  },
  
  _getCell: function(rowId,colId) {
    if (this._valueExists(rowId,colId)) {
      var value = this.values[rowId][colId];
      return "<td style=\""+ this._getStyle(value) +"\">"+ value +"</td>";
    } else {
      return "<td class=\"disabled\"></td>";
    } 
  },
  
  _getStyle: function(value) {
    return "background-color: rgba(0,0,0,"+ value/this.maxValue +");";
  },
  
  _valueExists: function(rowId,colId) {
    return rowId < this.values.length && colId < this.values[rowId].length;
  }
};